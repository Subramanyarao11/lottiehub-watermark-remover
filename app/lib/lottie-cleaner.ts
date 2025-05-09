interface LottieLayer {
  ind?: number;
  [key: string]: any;
}

interface LottieData {
  layers: LottieLayer[];
}

export function removeLottieLabWatermark(data: LottieData) {
    if (!data.layers || !Array.isArray(data.layers)) {
      throw new Error('Invalid Lottie file format');
    }

    const originalLayerCount = data.layers.length;

    const watermarkIndToRemove = 12345679;

    const filteredLayers = data.layers.filter(layer => layer.ind !== watermarkIndToRemove);

    if (filteredLayers.length === originalLayerCount) {

      const highestNormalInd = Math.max(...data.layers
        .filter(layer => layer.ind !== undefined && layer.ind < 1000000)
        .map(layer => layer.ind || 0), 0);

      const secondFilterAttempt = data.layers.filter(layer =>
        !layer.ind || layer.ind < highestNormalInd * 10
      );

      if (secondFilterAttempt.length < originalLayerCount) {
        data.layers = secondFilterAttempt;
      }
    } else {
      data.layers = filteredLayers;
    }

    return data;
  }
