import { Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLevel, setAlpha } from "../redux/optionSlide";
import { RootState } from "../redux/store";

export default function OptionBar() {
  const dispatch = useDispatch();
  const alpha = useSelector((state: RootState) => state.options.alpha);
  const level = useSelector((state: RootState) => state.options.level);

  // Hiragana groups
  const hiraganaGroups = [
    {
      key: "1",
      label: "あ",
      children: [
        { key: "1-1", label: "あ" },
        { key: "1-2", label: "か" },
        { key: "1-3", label: "さ" },
        { key: "1-4", label: "た" },
        { key: "1-5", label: "な" },
        { key: "1-6", label: "は" },
        { key: "1-7", label: "ま" },
        { key: "1-8", label: "や" },
        { key: "1-9", label: "ら" },
        { key: "1-10", label: "わ" },
      ],
    },
    {
      key: "2",
      label: "い",
      children: [
        { key: "2-1", label: "い" },
        { key: "2-2", label: "き" },
        { key: "2-3", label: "し" },
        { key: "2-4", label: "ち" },
        { key: "2-5", label: "に" },
        { key: "2-6", label: "ひ" },
        { key: "2-7", label: "み" },
        { key: "2-8", label: "り" },
      ],
    },
    {
      key: "3",
      label: "う",
      children: [
        { key: "3-1", label: "う" },
        { key: "3-2", label: "く" },
        { key: "3-3", label: "す" },
        { key: "3-4", label: "つ" },
        { key: "3-5", label: "ぬ" },
        { key: "3-6", label: "ふ" },
        { key: "3-7", label: "む" },
        { key: "3-8", label: "ゆ" },
        { key: "3-9", label: "る" },
      ],
    },
    {
      key: "4",
      label: "え",
      children: [
        { key: "4-1", label: "え" },
        { key: "4-2", label: "け" },
        { key: "4-3", label: "せ" },
        { key: "4-4", label: "て" },
        { key: "4-5", label: "ね" },
        { key: "4-6", label: "へ" },
        { key: "4-7", label: "め" },
        { key: "4-8", label: "れ" },
      ],
    },
    {
      key: "5",
      label: "お",
      children: [
        { key: "5-1", label: "お" },
        { key: "5-2", label: "こ" },
        { key: "5-3", label: "そ" },
        { key: "5-4", label: "と" },
        { key: "5-5", label: "の" },
        { key: "5-6", label: "ほ" },
        { key: "5-7", label: "も" },
        { key: "5-8", label: "よ" },
        { key: "5-9", label: "ろ" },
        { key: "5-10", label: "を" },
      ],
    },
  ];

  const dropdownItems: MenuProps["items"] = hiraganaGroups.map((group) => ({
    key: group.key,
    label: group.label,
    children: group.children.map((child) => ({
      key: child.key,
      label: (
        <p onClick={() => dispatch(setAlpha(child.label))}>{child.label}</p>
      ),
    })),
  }));

  const dropdownLevel: MenuProps["items"] = [
    {
      key: 1,
      label: <p onClick={() => dispatch(setLevel(1))}>N1</p>,
    },
    {
      key: 2,
      label: <p onClick={() => dispatch(setLevel(2))}>N2</p>,
    },
    {
      key: 3,
      label: <p onClick={() => dispatch(setLevel(3))}>N3</p>,
    },
    {
      key: 4,
      label: <p onClick={() => dispatch(setLevel(4))}>N4</p>,
    },
    {
      key: 5,
      label: <p onClick={() => dispatch(setLevel(5))}>N5</p>,
    },
  ];

  return (
    <>
      <div className="w-full bg-blue-500 px-3 py-4 flex space-x-3">
        <Dropdown menu={{ items: dropdownItems }} key="nav1">
          <Space className="bg-white p-2 rounded-md text-blue-500">
            Word {alpha}
            <DownOutlined />
          </Space>
        </Dropdown>
        <Dropdown menu={{ items: dropdownLevel }} key="nav2">
          <Space className="bg-white p-2 rounded-md text-blue-500">
            N{level}
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </>
  );
}
