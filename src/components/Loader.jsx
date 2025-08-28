// src/components/Loader.js
import React from 'react';
import LottieView from 'lottie-react-native';

export default function Loader() {
    return (
        <LottieView
            source={require('../../public/assets/loader/Circle_loader.json')}
            autoPlay
            loop
            speed={0.5}
            size={100}
            style={{
                position: 'absolute',
                top: 100,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10,
            }}
        />
    );
}
