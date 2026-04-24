import { SupportForm } from '@/components/support-form';

export default function ContactPage() {
  return (
    <SupportForm
      type="contact"
      title="お問い合わせ"
      description="サイトの使い方や不具合、要望などを送れます。返信が必要な場合はメールアドレスを入力してください。"
      defaultSubject="お問い合わせ"
    />
  );
}