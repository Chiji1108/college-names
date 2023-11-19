export default function ProfileLayout({
  children,
  modal,
}: // auth,
{
  children: React.ReactNode;
  modal: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <section>
      {children}
      {modal}
      {/* {auth} */}
    </section>
  );
}
