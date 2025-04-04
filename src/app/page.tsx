'use client';

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '@/store/slices/counterSlice';
import type { RootState } from '@/store';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Counter: {count}</h1>
      <button
        onClick={() => dispatch(increment())}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Decrement
      </button>
    </main>
  );
}
