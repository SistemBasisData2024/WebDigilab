import React from 'react';
import { CookiesProvider, useCookies } from 'react-cookie'
import Navigation from './Navigation';

// Data statis kontak pengajar
const teachers = [
  {
    id: 1,
    name: 'Evandita',
    angkatan: '2022',
    email: 'evan@gmail.com',
    photoUrl: 'https://via.placeholder.com/150',
    bio: '',
    whatsappNo: '+62',
    lineId: 'lineid',
    instagram: 'ig',
    profileUrl: 'https://www.linkedin.com/'
  },
  {
    id: 2,
    name: 'Edgrant',
    angkatan: '2022',
    email: 'edgrant@gmail.com',
    photoUrl: 'https://via.placeholder.com/150',
    whatsappNo: '+62',
    lineId: 'lineid',
    instagram: 'ig',
    profileUrl: 'https://www.linkedin.com/'
  },
  {
    id: 3,
    name: 'Giovan',
    angkatan: '2022',
    email: 'gio@gmail.com',
    photoUrl: 'https://via.placeholder.com/150',
    whatsappNo: '+62',
    lineId: 'lineid',
    instagram: 'ig',
    profileUrl: 'https://www.linkedin.com/'
  },
];

// Komponen untuk menampilkan satu kontak pengajar
const TeacherContactCard = ({ teacher }) => {
  return (
    
    <a
      href={teacher.profileUrl}
      className=" relative block bg-gray-700 overflow-hidden rounded-lg border border-gray-800 p-4 sm:p-6 lg:p-8"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600"
      ></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {teacher.name}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">Angkatan: {teacher.angkatan}</p>
          <p className="mt-1 text-xs font-medium text-gray-600">Email: {teacher.email}</p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt=""
            src={teacher.photoUrl}
            className="size-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-pretty text-sm text-gray-500">
          {teacher.bio}
        </p>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{teacher.whatsappNo}</dt>
          <dd className="text-xs text-gray-500">Whatsapp No</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{teacher.lineId}</dt>
          <dd className="text-xs text-gray-500">Line id</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">{teacher.instagram}</dt>
          <dd className="text-xs text-gray-500">Instagram</dd>
        </div>
      </dl>
    </a>
    
  );
};

// Komponen utama untuk halaman kontak pengajar
function GetContact ()  {
  const [cookies, setCookie] = useCookies('user')

  return (
    <>
    <Navigation isAslab={cookies.user.isAslab} />
    <div className="bg-gray-900 min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-20 text-white text-center">Digital Laboratory Assistants</h1>
        <div className="flex justify-center">
          <div className="w-2/3">
            <div className="grid grid-cols-1 gap-10">
              {teachers.map((teacher) => (
                <TeacherContactCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default GetContact;
