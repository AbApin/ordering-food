import toast from 'react-hot-toast';
import Image from 'next/image';

export default function EditableImage({ link, setLink }) {
  const handleFileChange = async (evt) => {
    const files = evt.target.files;
    if (files.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);
      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }

        throw new Error('Something went wrong');
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Image upload!',
        error: 'Error',
      });
    }
  };

  return (
    <>
      {link ? (
        <Image src={link} width={80} height={80} alt="avatar" className="rounded-full" />
      ) : (
        <div className="flex items-center justify-center bg-gray-200 w-20 h-20 rounded-full text-gray-500">
          No image
        </div>
      )}
      <label className="w-full cursor-pointer">
        <input type="file" hidden onChange={handleFileChange} />
        <span className="block rounded-lg border border-gray-300 p-2 text-center">Edit</span>
      </label>
    </>
  );
}
