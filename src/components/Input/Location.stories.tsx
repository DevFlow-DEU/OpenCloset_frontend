import type { Meta, StoryObj } from '@storybook/react-vite';
import Location from './Location';
import { stubRegister } from '../../testing/storyUtils';

const meta = {
  title: 'Components/Input/Location',
  component: Location,
  args: {
    label: '거래 장소',
    placeholder: '장소를 선택해 주세요',
    register: stubRegister('location'),
    map: 'map',
  },
} satisfies Meta<typeof Location>;

export default meta;
type Story = StoryObj<typeof meta>;

// 지도 드로워를 열려면 Kakao SDK(VITE_KAKAO_JS)가 필요합니다
export const Map: Story = {};

export const DetailedMap: Story = {
  args: {
    coordRegister: stubRegister('coord'),
    map: 'detailedMap',
  },
};
