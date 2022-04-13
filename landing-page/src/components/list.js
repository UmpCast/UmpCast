import React from 'react';
import { Flex, Box, IconButton } from 'theme-ui';

export default function List({ items = [], parentStyle, childStyle }) {
  return (
    <Box
      as="ul"
      sx={{
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        ...parentStyle,
      }}
    >
      {items.map(({ icon, text }, i) => (
        <Flex as="li" sx={{ ...childStyle }} key={i}>
          <IconButton
            sx={{
              color: '#FFC059',
              width: 'auto',
              height: 'auto',
              padding: 0,
              fontSize: 30,
              marginRight: 2,
            }}
            aria-label="list icon"
          >
            {icon}
          </IconButton>
          {text}
        </Flex>
      ))}
    </Box>
  );
}
