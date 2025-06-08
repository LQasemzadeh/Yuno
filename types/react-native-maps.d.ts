// types/react-native-maps.d.ts
declare module 'react-native-maps' {
    import { ComponentType } from 'react';
    import { ViewProps } from 'react-native';

    export interface MarkerProps extends ViewProps {
        coordinate: {
            latitude: number;
            longitude: number;
        };
        title?: string;
        description?: string;
    }

    export const Marker: ComponentType<MarkerProps>;

    const MapView: ComponentType<ViewProps>;
    export default MapView;
}
