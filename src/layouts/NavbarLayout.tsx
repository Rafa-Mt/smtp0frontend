// import { useEffect, useState } from 'react';
import { IconListSearch } from '@tabler/icons-react';
import cx from 'clsx';
import { Box, Group, Text } from '@mantine/core';
import classes from '../styles/Navbar.module.css';
import { Mail } from '../types/mail';

// const links = [
//   { label: 'Usage', link: '#usage', order: 1 },
//   { label: 'Position and placement', link: '#position', order: 1 },
//   { label: 'With other overlays', link: '#overlays', order: 1 },
//   { label: 'Manage focus', link: '#focus', order: 1 },
//   { label: 'Examples', link: '#1', order: 1 },
//   { label: 'Show on focus', link: '#2', order: 2 },
//   { label: 'Show on hover', link: '#3', order: 2 },
//   { label: 'With form', link: '#4', order: 2 },
// ];

const NavbarLayout = ({ data, selected, setSelected }: { data: Mail[], selected: number | null, setSelected: React.Dispatch<React.SetStateAction<number | null>> }) => {

  const items = data.map((item, index) => (

    <Box<'a'>
      component="a"
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setSelected(index);
      }}
      key={index}
      className={cx(classes.link, { [classes.linkActive]: selected === index })}
      style={{ paddingLeft: `calc(${((selected === index) ? 1 : 0)} * var(--mantine-spacing-md))` }}
    >
      {item.from}: "<b>{item.subject.slice(0, 15)}{item.subject.length > 15 ? "..." : ""}</b>"
    </Box>
  ));

  if (items.length === 0)
    return <>Empty Inbox</>

  return (
      
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch size={18} stroke={1.5} />
        <Text>Inbox</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(calc(${selected} * var(--link-height) + var(--indicator-offset)))`,
          }}
        />
        {items}
      </div>
    </div>
  );
}

export default NavbarLayout