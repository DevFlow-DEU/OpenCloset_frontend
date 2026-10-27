import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useSearchAdvanced } from '../../hooks';
import SearchResult from './SearchResult';

vi.mock('../../hooks', () => ({
  useSearchAdvanced: vi.fn(),
}));

const mockedUseSearchAdvanced = vi.mocked(useSearchAdvanced);
const SEARCH_TEXT = '오픈클로셋';

const ITEMS = [
  {
    id: 1,
    name: '이지보니스 플랫 스니커즈',
    rentalCost: 3200,
    rentalPeriod: 1,
    imageUrls: [],
    status: '대여가능',
    startDate: '2026-12-23',
    endDate: '2026-12-31',
  },
  {
    id: 2,
    name: 'MH GRAPHIC SHORT SLEEVE',
    rentalCost: 5000,
    rentalPeriod: 3,
    imageUrls: [],
    status: '예약중',
  },
];

function mockResult(items: typeof ITEMS) {
  mockedUseSearchAdvanced.mockReturnValue({
    data: { items, totalCount: items.length },
  } as unknown as ReturnType<typeof useSearchAdvanced>);
}

function renderPage() {
  return render(
    <MemoryRouter
      initialEntries={[`/search/result/${encodeURIComponent(SEARCH_TEXT)}`]}
    >
      <Routes>
        <Route path="/search/result/:searchText" element={<SearchResult />} />
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

test('URL의 검색어를 검색창에 표시한다', async () => {
  const screen = await renderPage();
  await expect.element(screen.getByRole('searchbox')).toHaveValue(SEARCH_TEXT);
});

test('검색 결과 개수와 상품 목록을 렌더링한다', async () => {
  const screen = await renderPage();
  await expect.element(screen.getByText('상품 2')).toBeInTheDocument();
  await expect
    .element(screen.getByText('이지보니스 플랫 스니커즈'))
    .toBeInTheDocument();
  await expect
    .element(screen.getByText('MH GRAPHIC SHORT SLEEVE'))
    .toBeInTheDocument();
});

test('검색 결과가 없으면 안내 문구를 보여준다', async () => {
  mockResult([]);
  const screen = await renderPage();
  await expect
    .element(screen.getByText('검색 결과가 없습니다.'))
    .toBeInTheDocument();
});

test('검색어로 검색 조건을 만들어 훅에 전달한다', async () => {
  await renderPage();
  expect(mockedUseSearchAdvanced).toHaveBeenLastCalledWith(
    expect.objectContaining({ title: SEARCH_TEXT }),
    'latest'
  );
});

test('정렬 버튼을 누르면 정렬 기준이 다음 값으로 바뀐다', async () => {
  const screen = await renderPage();
  await screen.getByRole('button', { name: '최신순' }).click();

  await expect
    .element(screen.getByRole('button', { name: '낮은 가격순' }))
    .toBeInTheDocument();
  expect(mockedUseSearchAdvanced).toHaveBeenLastCalledWith(
    expect.anything(),
    'cheap'
  );
});
