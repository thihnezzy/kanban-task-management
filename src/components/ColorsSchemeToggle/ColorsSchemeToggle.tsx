import {
  Group, Image, Switch, useComputedColorScheme, useMantineColorScheme,
} from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

import dark from '@/assets/icon-dark-theme.svg';
import light from '@/assets/icon-light-theme.svg';

export default function ColorsSchemeToggle(): React.ReactElement {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <Group className={clsx('w-full py-4 rounded-lg bg-light-grey', 'dark:bg-very-dark-grey')} justify="center" my={8}>
      <Image src={light} alt="Light theme" width={20} height={20} />
      <Switch
        classNames={{
          track: 'bg-[#635FC7] border-none',
        }}
        onChange={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      />
      <Image src={dark} alt="Dark theme" width={20} height={20} />
    </Group>
  );
}
