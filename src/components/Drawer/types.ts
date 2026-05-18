export type DrawerProps = {
    selected?: string
    selectedCoord?: string
    onSelect: (text: string) => void
    onSelectWithCoord?: (text: string, coord: string) => void
    onClose: () => void
}
//드로워는 종류가 적어서 하나로 묶어서 사용할듯