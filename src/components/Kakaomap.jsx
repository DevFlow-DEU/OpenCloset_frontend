// import React, { useEffect } from "react";

// const { kakao } = window; // 추가

// function Kakaomap() {
//   useEffect(() => {
//     const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
//     const options = {
//       center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
//       level: 3
//     };


// ``
//     const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
//   }, []);
//     const geocoder = new kakao.maps.services.Geocoder();//추가됨

//     geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function(result, status) {

//        if (status === kakao.maps.services.Status.OK) {
//          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 결과값으로 받은 위치를 마커로 표시합니다
//         const marker = new kakao.maps.Marker({
//             map: map,
//             position: coords
//         });
//       }
//         });




//     return(
//       <div id='map' style={{width: "300px", height: "300px"}}></div>
//     )
// }
  
//   export default Kakaomap;
import React, { useEffect } from "react";

function Kakaomap({ address }) {
  useEffect(() => {

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=233532845c52acf084e31135ffe40cad&autoload=false&libraries=services";
      script.async = true;
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
