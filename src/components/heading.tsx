import { Separator } from '@/components/ui/separator';

type HeadingProps = {
  title: string;
  description?: string;
};

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <Separator />
    </>
  );
};

export { Heading };

/*
 * 開發學習紀錄:
 *
 * == 2025-05-24 ==
 * - 使用 named export 而不是 default export，因為 named export 有強制性，這樣可以避免命名衝突、亂命名，也利於 Tree Shaking
 * - 要注意這個 component 是開在 src/components 底下，不是在 src/components/ui 底下，/ui 那邊是給 Shadcn 初始元件使用的
 *
 * ===
 */
