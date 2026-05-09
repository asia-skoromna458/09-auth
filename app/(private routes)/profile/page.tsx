import Image from "next/image";
import css from "./ProfilePage.module.css";

// type Props = {
//   params: Promise<{ id: string }>;
// };
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   //const { id } = await params;

//   //const note = await fetchNoteById(id);

//   return {
//     title:
//     description:
//     openGraph: {
//       title:
//       description:
//       url:
//       images: [
//         { url: ,
//       ],
//     },
//   };
// }
export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}
