import { LucideMessageSquareWarning } from 'lucide-react';
import { cloneElement } from 'react';

type PlaceholderProps = {
  label: string;
  // 筆記點C
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <>
      {/* 筆記點A */}
      <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
        {/* 筆記點B */}
        {/* @ts-expect-error - TODO: 改用更具體的型別定義或考慮使用 Render Props 模式 */}
        {cloneElement(icon, { className: 'w-16 h-16' })}
        <div className="text-lg text-center">{label}</div>
        {/* @ts-expect-error - TODO: 改用更具體的型別定義或考慮使用 Render Props 模式 */}
        {cloneElement(button, { className: 'h-10' })}
      </div>
    </>
  );
};

export { Placeholder };

/*
 * 開發學習紀錄:
 *
 * == 2025-05-24 ==
 * - [筆記點A] 關於 Styling
 *   - self-center 只是讓這個區塊在父容器裡垂直置中，但其實只有一個元素時加不加都差不多
 *   - "flex-1 flex flex-col" 這種搭配很常一起用來當作最外層、撐滿最大的容器
 *
 * - [筆記點B] 關於 cloneElement 為什麼要這樣做？
 *   - 雖然 cloneElement 在靈活性、型別安全性和官方建議方面都不是最佳選擇，但 Robin 選擇使用它主要是為了提升開發者體驗（DX）
 *   - 在這個場景中，組件邏輯簡單且樣式需求明確，使用 cloneElement 可以讓開發者專注於傳入所需的元件，而不需要關心樣式細節
 *   - 這部分是可以改用 Render Props 模式實作，但目前兩種方式在功能上沒有顯著差異
 *   - 需要注意的是，cloneElement 可能在未來的 React 版本中被棄用，屆時需要考慮遷移到其他模式
 *
 * - [筆記點C] 目前型別有什麼問題？
 *   - React 把 React.ReactElement 的 type 由 any 轉為 unknown，造成 cloneElement 無法確定 icon, button 的型別
 *
 * - ReactNode 與 ReactElement 的差異
 *   - ReactNode 是所有可以被 Render 在 React 的東西，如 string, number, boolean, null...，當中也包含 ReactElement
 *   - ReactElement 是一個更具體有特定結構的 Object(type, props, key...)，通常 JSX 的結果就是 ReactElement，它代表了 Virtual DOM 中的一個元素
 *
 * ===
 */
