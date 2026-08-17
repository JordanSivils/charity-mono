'use client';

import { useId } from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

const ToggleTheme = () => {
  const id = useId();
  const { setTheme, resolvedTheme } = useTheme();
  const checked = resolvedTheme === 'dark';

  return (
    <div
      className='group inline-flex items-center gap-2'
      data-state={checked ? 'checked' : 'unchecked'}
    >
      <span
        id={`${id}-light`}
        className='group-data-[state=checked]:text-muted-foreground/70 cursor-pointer text-left text-sm font-medium'
        aria-controls={id}
        onClick={() => setTheme('light')}
      >
        <SunIcon className='size-4' aria-hidden='true' />
      </span>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={(next) => {
          setTheme(next ? 'dark' : 'light');
        }}
        aria-labelledby={`${id}-dark ${id}-light`}
        aria-label='Toggle between dark and light mode'
        className="
          data-[state=unchecked]:bg-zinc-300
          dark:data-[state=unchecked]:bg-zinc-700
          data-[state=checked]:bg-primary
          border border-black/10 dark:border-white/10
          shadow-sm
        "
      />
      <span
        id={`${id}-dark`}
        className='group-data-[state=unchecked]:text-muted-foreground/70 cursor-pointer text-right text-sm font-medium'
        aria-controls={id}
        onClick={() => setTheme('dark')}
      >
        <MoonIcon className='size-4' aria-hidden='true' />
      </span>
    </div>
  );
};

export default ToggleTheme;
