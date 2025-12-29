export const defaultMapEntry = {
  latitude: 49.0134,
  longitude: 12.1016
};

export const leafletService = {
  async getStartPosition(): Promise<{ latitude: number; longitude: number }> {
    let startLatitude = defaultMapEntry.latitude;
    let startLongitude = defaultMapEntry.longitude;
    try {
      const position = await this.getCurrentPosition();
      startLatitude = position.latitude;
      startLongitude = position.longitude;
    } catch (error) {
      console.log(error);
    }
    return {
      latitude: startLatitude,
      longitude: startLongitude
    };
  },

  async getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject();
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
        reject
      );
    });
  }
};
