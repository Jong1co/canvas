# Canvas

---

`ctx: CanvasRenderingContext2D`

<canvas> 요소의 드로잉 표면에 2D 렌더링 컨텍스트를 제공한다.
도형, 텍스트, 이미지 및 기타 객체를 그리는데 사용된다.
즉, 캔버스에 2D로 그릴 때 사용하는 객체

arc(): canvas에서 원을 그릴 수 있도록 해주는 메소드
arc(x, y, 반지름, 시작 각도, 끝 각도, 방향 설정)
x: 원의 x좌표
y: 원의 y좌표
반지름: 원의 반지름
시작 각도: **3시를** 기준으로 시계방향 시작 각도
끝 각도: **3시를** 기준으로 시계방향 끝나는 각도
뱡향 설정: default = false (시계방향)
