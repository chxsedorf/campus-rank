import { SupportForm } from '@/components/support-form';

export default function ReportPage() {
  return (
    <SupportForm
      type="report"
      title="問題のある投稿を報告する"
      description="誹謗中傷、個人情報、事実誤認の恐れがある内容などを報告できます。対象の授業IDがわかる場合は入力してください。"
      defaultSubject="問題投稿の報告"
      showCourseField
    />
  );
}