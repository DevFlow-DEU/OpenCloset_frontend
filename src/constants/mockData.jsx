const productsData = [
  {
    id: 5, // 매물에 대한 ID (정수)
    name: 'Script Logo Heavyweigh...', // 매물 제품명
    rentalPeriod: 3, // 대여 일 수 (정수, 예: 7일)
    rentalCost: 3700, // 대여 비용 (정수, 예: 15000원)
    location: '중앙동', // 지역명
    imageUrl: '/hoodie.png', // 대표 이미지 URL
    createdAt: '2025-04-08T10:00:00Z', // 생성된 날짜 (ISO 8601 포맷 추천)
    isSaved: true,
  },
  {
    id: 4,
    name: '윈드브레이커 자켓_블랙',
    rentalPeriod: 7,
    rentalCost: 5300,
    location: '범일동',
    imageUrl: '/windbreaker.png',
    createdAt: '2025-04-07T15:30:00Z',
    isSaved: false,
  },
  {
    id: 21,
    name: 'Script Logo Heavyweigh...',
    rentalPeriod: 14,
    rentalCost: 10700,
    location: '가야동',
    imageUrl: '/pants.png',
    createdAt: '2025-04-07T15:30:00Z',
    isSaved: false,
  },
  {
    id: 1,
    name: '와이드 롱 스웨트 팬츠',
    rentalPeriod: 5,
    rentalCost: 7300,
    location: '남포동',
    imageUrl: '/pants1.png',
    createdAt: '2025-04-07T15:30:00Z',
    isSaved: false,
  },
  {
    id: 6,
    name: '오버핏 크루넥 맨투맨',
    rentalPeriod: 5,
    rentalCost: 4200,
    location: '부전동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20240123/3814010/3814010_17167921096020_big.jpg?w=390',
    createdAt: '2025-04-10T09:30:00Z',
    isSaved: false,
  },
  {
    id: 7,
    name: '클래식 더블 브레스티드 코트',
    rentalPeriod: 7,
    rentalCost: 6900,
    location: '우동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20250304/4851711/4851711_17410528931726_big.jpg?w=1200',
    createdAt: '2025-04-12T14:45:00Z',
    isSaved: true,
  },
  {
    id: 8,
    name: '케이블 니트 스웨터',
    rentalPeriod: 3,
    rentalCost: 3800,
    location: '광안동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20230816/3468321/3468321_17321582572261_big.png?w=1200',
    createdAt: '2025-04-15T11:20:00Z',
    isSaved: false,
  },
  {
    id: 9,
    name: '라이트 패딩 자켓',
    rentalPeriod: 4,
    rentalCost: 5600,
    location: '남포동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20240208/3858740/3858740_17073700169520_big.jpg?w=1200',
    createdAt: '2025-04-18T16:10:00Z',
    isSaved: true,
  },
  {
    id: 10,
    name: '데님 트러커 자켓',
    rentalPeriod: 6,
    rentalCost: 5000,
    location: '대연동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20230306/3123447/3123447_17171164819017_big.jpg?w=1200',
    createdAt: '2025-04-20T08:40:00Z',
    isSaved: false,
  },
  {
    id: 11,
    name: '플리스 하프 집업',
    rentalPeriod: 2,
    rentalCost: 3500,
    location: '덕천동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20240911/4432439/4432439_17261057292929_big.jpg?w=1200',
    createdAt: '2025-04-22T15:15:00Z',
    isSaved: true,
  },
  {
    id: 12,
    name: '경량 바람막이 아노락',
    rentalPeriod: 4,
    rentalCost: 3900,
    location: '온천동',
    imageUrl:
      'https://image.msscdn.net/thumbnails/images/goods_img/20241112/4605737/4605737_17315657408624_big.jpg?w=1200',
    createdAt: '2025-04-24T12:25:00Z',
    isSaved: false,
  },
];
const searchHistoryData = [
  {
    id: 1,
    word: '후드집업',
  },
  {
    id: 2,
    word: '바람막이',
  },
  {
    id: 3,
    word: '버뮤다 팬츠',
  },
  {
    id: 4,
    word: '가디건',
  },
  {
    id: 5,
    word: '마인드 브릿지',
  },
];
export { productsData, searchHistoryData };
