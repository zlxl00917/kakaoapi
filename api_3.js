var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.544575, 127.037442), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };  

    // 지도를 생성합니다    
    var map = new kakao.maps.Map(mapContainer, mapOption); 

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(); 
    // 키워드로 장소를 검색합니다
   
    function searchPlaces(){
        var keyword = document.getElementById('input').value;
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }
    //  키워드로 장소검색을 요청
    ps.keywordSearch( keyword, placesSearchCB); 
    document.getElementById("input").value = "";
    }
    
    // 키워드 검색 완료 시 호출되는 콜백함수 
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayMarker(data);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
}


    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
        
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭시 오버레이 뜸
            var content = '<div class="placeinfo">' +
            '   <div class="title">' + place.place_name + '</div>';   

            if (place.road_address_name) {
            content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
                        '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
            }  else {
            content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
            }                

            content += '    <span class="tel">' + place.phone + '</span>'; 
                   
            content += '    <span>'+'<a href="' + place.place_url + '">' + '길찾기' + '</a>'+ '</span>';+  
                    '<div class="after"></div>';
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
    }
    
   
