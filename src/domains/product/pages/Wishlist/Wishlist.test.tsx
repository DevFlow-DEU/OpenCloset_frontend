import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ApiError } from '../../../../api/http';
import { useMyWishlist } from '../../hooks';
import Wishlist from './Wishlist';

vi.mock('../../hooks', () => ({
  useMyWishlist: vi.fn(),
  useWishlistToggle: vi.fn(() => ({ mutate: vi.fn() })),
}));

const mockedUseMyWishlist = vi.mocked(useMyWishlist);

const ITEMS = [
  {
    id: 1,
    title: '이지보니스 플랫 스니커즈',
    images: [],
    price: 3200,
    rentalDays: 1,
    status: '대여가능',
    startDate: '2026-12-23',
    endDate: '2026-12-31',
    wished: true,
  },
  {
    id: 2,
    title: 'MH GRAPHIC SHORT SLEEVE',
    images: [],
    price: 5000,
    rentalDays: 3,
    status: '예약중',
    wished: true,
  },
];

function mockResult(items: typeof ITEMS) {
  mockedUseMyWishlist.mockReturnValue({
    data: { items, totalCount: items.length },
    error: null,
  } as unknown as ReturnType<typeof useMyWishlist>);
}

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/wishlist']}>
      <Routes>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<div>로그인 페이지</div>} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  mockResult(ITEMS);
});

afterEach(() => {
  vi.clearAllMocks();
});

test('좋아요 개수와 상품 목록을 렌더링한다', async () => {
  const screen = await renderPage();
  await expect.element(screen.getByText('좋아요 2')).toBeInTheDocument();
  await expect
    .element(screen.getByText('이지보니스 플랫 스니커즈'))
    .toBeInTheDocument();
  await expect
    .element(screen.getByText('MH GRAPHIC SHORT SLEEVE'))
    .toBeInTheDocument();
});

test('상품이 없으면 안내 문구를 보여준다', async () => {
  mockResult([]);
  const screen = await renderPage();
  await expect
    .element(screen.getByText('좋아요한 상품이 없습니다.'))
    .toBeInTheDocument();
});

test('카테고리 탭을 누르면 해당 카테고리로 조회한다', async () => {
  const screen = await renderPage();
  await screen.getByRole('button', { name: '아우터' }).click();
  expect(mockedUseMyWishlist).toHaveBeenLastCalledWith({ category: 'outer' });
});

test('정렬 버튼을 누르면 가격순으로 정렬한다', async () => {
  const screen = await renderPage();
  await screen.getByRole('button', { name: '최신순' }).click();
  await screen.getByRole('button', { name: '낮은 가격순' }).click();
  await expect
    .element(screen.getByRole('button', { name: '높은 가격순' }))
    .toBeInTheDocument();

  const ids = Array.from(document.querySelectorAll('img')).map(
    (img) => img.alt
  );
  expect(ids).toEqual(['2', '1']);
});

test('401 응답이면 로그인 페이지로 이동한다', async () => {
  mockedUseMyWishlist.mockReturnValue({
    data: undefined,
    error: new ApiError(401, { message: 'Unauthorized' }),
  } as unknown as ReturnType<typeof useMyWishlist>);
  const screen = await renderPage();
  await expect.element(screen.getByText('로그인 페이지')).toBeInTheDocument();
});
