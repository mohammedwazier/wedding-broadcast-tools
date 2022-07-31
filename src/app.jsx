import { useState } from 'preact/hooks'
import './app.css'

export function App() {
  const [list, setList] = useState([]);
  const [payload, setPayload] = useState({
    name: '',
    telp: '',
  });

  const WEDDING_URL = 'https://amalia-yazied-mengundang.bitskylab.com/?to=';

  const templateFormData = (name) => {
    return `
Yth. ${name}

Assalamu'alaikum Warahmatullahi Wabarakatuh

Bismillahirahmanirrahim.

Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah. (QS. Adz-Dzariyat: 49)

Undangan ini merupakan undangan resmi dari kami, tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami :

Nur Amalia & Yazied Dhiya Uddien A

Mohon doa restunya. Berikut link dan info lengkap dari acara kami :

${WEDDING_URL}${name}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.

Mohon kesediaannya untuk mengisi RSVP sebagai konfirmasi kehadiran.

-------------------------

Hormat Kami yang berbahagia,

Amalia & Yazied

Wassallamualaikum Warahmatullahi Wabarakatuh`
  }

  const handleAddForm = async (e) => {
    e.preventDefault();

    if(payload.name.length === 0 || !payload.telp.length === 0){
      alert('Harap mengisi Data terlebih dahulu');
      return;
    }

    const req = {
      id: Math.floor(100000 + Math.random() * 900000),
      name: payload.name,
      link: WEDDING_URL + payload.name,
      telp: convertPhoneNumberWithoutPlus(payload.telp),
      status: false,
      message: templateFormData(payload.name),
      whatsappLink: `https://wa.me/${convertPhoneNumberWithoutPlus(payload.telp)}?text=${encodeURIComponent(templateFormData(payload.name))}`
    };

    console.log(req.whatsappLink)

    setList([
      ...list,
      req,
    ]);
  }

  const convertPhoneNumberWithoutPlus = (phone) => {
    let phoneNumber = phone.toString()
    if (phoneNumber.startsWith('08')) {
      const newphone = phoneNumber.substring(1)
      phoneNumber = `62${newphone}`
      return phoneNumber
    }
    if (phoneNumber.startsWith('8')) {
      phoneNumber = `62${phoneNumber}`
      return phoneNumber
    }
    return null
  }

  return (
    <>
    <div className='container mx-auto p-4'>
      <p className='font-bold text-3xl text-gray-700'>Invitation List Wedding of Amalia & Yazied</p>
      <br />
      <form className='space-y-4 flex flex-col mb-7' onSubmit={handleAddForm}>
        <div className=''>
          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input value={payload.name} onChange={(e) => setPayload({...payload, [e.target.name]: e.target.value})} name="name" autoFocus className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nama (Contoh: Yazied)" />
        </div>
        <div className=''>
          <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
            Telp
          </label>
          <input value={payload.telp} onChange={(e) => setPayload({...payload, [e.target.name]: e.target.value})} name="telp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>

        <div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Tambah Data
          </button>
        </div>
      </form>
      <div>
        <p>List Broadcast Data</p>
        <table className='table-auto'>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Telp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((d, idx) => {
              return (
                <tr className={idx % 2 !== 0 ? `bg-gray-100` : ''}>
                  <td className='border px-7 py-2'>
                    {d.name}
                  </td>
                  <td className='border px-7 py-2'>
                    {d.telp}
                  </td>
                  <a href={d.whatsappLink} target="_blank">
                    <buttons type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Kirim Whatsapp
                    </buttons>
                  </a>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Nama</th>
              <th>Telp</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
      
    </>
  )
}
