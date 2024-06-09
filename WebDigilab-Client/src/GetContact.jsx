import React from 'react';

// Data statis kontak pengajar
const teachers = [
  {
    id: 1,
    name: 'Evandita',
    email: 'evan@gmail.com',
    photoUrl: 'https://via.placeholder.com/150',
    department: 'Electrical Engineering',
    phone: 'lineid',
  },
  {
    id: 2,
    name: 'Edgrant',
    email: 'edgrant@gmail.com',
    photoUrl: 'https://via.placeholder.com/150',
    department: 'Electrical Engineering',
    phone: 'lineid',
  },
  {
    id: 3,
    name: 'Giovan',
    email: 'gio@gmail.com',
    photoUrl: 'https://via.placeholder.com/150',
    department: 'Electrical Engineering',
    phone: 'lineid',
  },
  // Tambahkan data pengajar lainnya di sini
];

// Komponen untuk menampilkan satu kontak pengajar
const TeacherContactCard = ({ teacher }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex shadow-lg rounded-lg overflow-hidden bg-gray-800">
      <div className="flex-shrink-0">
        <img className="w-full h-48 object-cover lg:w-48" src={teacher.photoUrl} alt={`Avatar of ${teacher.name}`} />
      </div>
      <div className="p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-white font-bold text-xl mb-2">{teacher.name}</div>
          <p className="text-gray-400 text-base">{teacher.email}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-400 leading-none">{teacher.department}</p>
            <p className="text-gray-400">{teacher.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen utama untuk halaman kontak pengajar
function GetContact ()  {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Aslab Contact</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <TeacherContactCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetContact;
