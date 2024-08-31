import { useState } from 'hono/jsx'
import type { FC } from 'hono/jsx';
import type { Student } from '../db';

const StudentForm: FC = () => {
  const [student, setStudent] = useState<Partial<Student>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Submitting student:', student);
    const formData = new FormData();

    try {
      const response = await fetch('/create', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const result = await response.json();
      console.log('Success:', result);
      setStudent({});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} method='POST' className="mt-6 space-y-4 flex flex-col justify-items-start">
      <h1 className="text-3xl font-semibold dark:text-white"> Add a New Student</h1>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={student.name}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
        />
      </div>
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700 dark:text-white">Student ID</label>
        <input
          type="text"
          name="student_id"
          id="student_id"
          value={student.student_id}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'bg-indigo-400' : 'bg-indigo-600'}`}
      >
        {isLoading ? 'Submitting...' : 'Add Student'}
      </button>
    </form>
  );
};

export default StudentForm;
