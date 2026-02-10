import React, { useEffect } from "react";


function Kakaomap({ address }) {
  useEffect(() => {

    if (!window.kakao || !window.kakao.maps) {
  const jskey = import.meta.env.VITE_KAKAO_JS;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${jsKey}&autoload=false&libraries=services`;

  script.onload = () => {
    window.kakao.maps.load(() => {
      initMap();
    });
  };

  document.head.appendChild(script);
} else {
  
  window.kakao.maps.load(() => {
    initMap();
  });
}


    function initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          const infowindow = new window.kakao.maps.InfoWindow(
            
          );

          infowindow.open(map);
          map.setCenter(coords);
        }
      });
    }
  }, [address]); // 주소 변경 시 재실행

  return (
    
      <div id="map" style={{ width: "300px", height: "300px", border :"2px solid #ccc" }}/>
      
    
  );
}

export default Kakaomap;
