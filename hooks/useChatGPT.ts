// hooks/useChatGPT.ts
import { OPENAI_API_KEY } from '@env';

export const askChatGPT = async (
    message: string,
    onStream?: (chunk: string) => void
): Promise<string> => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                temperature: 0.7,
                stream: Boolean(onStream),
            }),
        });

        if (!onStream) {
            const data = await response.json();
            return data.choices[0].message.content;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let fullResponse = '';

        while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((line) => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const jsonStr = line.replace('data: ', '');
                    if (jsonStr === '[DONE]') break;

                    try {
                        const parsed = JSON.parse(jsonStr);
                        const content = parsed.choices?.[0]?.delta?.content;
                        if (content) {
                            fullResponse += content;
                            onStream?.(content);
                        }
                    } catch (err) {
                        console.error('Error parsing stream chunk:', err);
                    }
                }
            }
        }

        return fullResponse;
    } catch (error: any) {
        console.error('ChatGPT error:', error?.response?.data || error.message);
        return 'Something went wrong. Please try again.';
    }
};
