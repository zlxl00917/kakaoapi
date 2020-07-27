var mapContainer = document.getElementById('map'), // (Node)지도가 표시될 HTML element 
            mapOption = { //(object)지도옵션
                center: new kakao.maps.LatLng(37.544575, 127.037442), // 지도의 중심좌표LatLng(latitude,longitude)
                level: 3 // 확대 수준
            };
        
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성
        
        // 마커위치
        var markerPosition  = new kakao.maps.LatLng(37.544575, 127.037442); 
        
        // 마커생성
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
    
            //cf.마커제거=>marker.setMap(null)  
        
        var content = '<div class="wrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            서울숲' + 
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="https://search.daum.net/search?w=img&nzq=%EC%84%9C%EC%9A%B8%EC%88%B2&DA=IIM&q=%EC%84%9C%EC%9A%B8%EC%88%B2%20%EA%B3%B5%EC%9B%90&docid=33h-BXLXUohWMJlVLc" width="73" height="70">' +
            '           </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 성동구 성수동1가 뚝섬로 273</div>' + 
            '                <div class="jibun ellipsis">(우) 04770 </div>' + 
            '                <div><a href="https://seoulforest.or.kr/info/park-info" target="_blank" class="link">홈페이지</a></div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
        
        //커스텀 오버레이, 마커를 중심으로 표시하기 위해 css를 이용해서 위치를 설정함.
        var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()       
        });
        closeOverlay()
        // 마커를 클릭 시 커스텀 오버레이를 표시
        kakao.maps.event.addListener(marker, 'click', function() {
            overlay.setMap(map);
        });

        // 커스텀 오버레이닫기
        function closeOverlay() {
            overlay.setMap(null);     
        }