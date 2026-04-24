import { SupportForm } from '@/components/support-form';

export default function CorrectionPage() {
  return (
    <SupportForm
      type="correction"
      title="掲載内容の修正相談"
      description="授業情報の誤りや更新が必要な内容があれば送ってください。対象の授業IDがわかる場合は入力してください。"
      defaultSubject="掲載内容の修正相談"
      showCourseField
    />
  );
}