import React from 'react';
import { Box, Heading, Text } from 'theme-ui';
import Image from 'components/image';
import { Link } from 'components/link';

import CommentIcon from 'assets/comment-1.svg';

const FeatureCard = (props) => {
  return (
    <Box sx={styles.fevCard}>
      <Box className="image" sx={styles.image}>
        <Image src={props.image} alt="" />
      </Box>
      <Box sx={styles.content}>
        <Heading as="h3">
          <Link path={props.path}>{props.title}</Link>
        </Heading>
        <Text as="p">
          <Image src={CommentIcon} alt="" />
          {props.commentCount}
        </Text>
      </Box>
    </Box>
  );
};

export default FeatureCard;

const styles = {
  fevCard: {
    transition: '500ms',
    borderRadius: '5px',
    '&:hover': {
      boxShadow: '0px 15px 50px rgba(69, 88, 157, 0.1)',
    },
  },
  image: {
    overflow: 'hidden',
    borderTopLeftRadius: ['5px'],
    borderTopRightRadius: ['5px'],
    img: {
      display: 'block',
      width: '100%',
    },
  },
  content: {
    backgroundColor: '#fff',
    paddingLeft: [20, null, null, '30px'],
    paddingRight: [20, null, null, '30px'],
    paddingTop: ['15px', null, null, '25px'],
    borderBottomLeftRadius: ['5px'],
    borderBottomRightRadius: ['5px'],
    pb: ['10px', null, null, null, '30px'],
    border: '1px solid #F3F4F5',
    borderTop: '0',
    h3: {
      fontWeight: 'bold',
      fontSize: ['18px', null, '17px', null, 3],
      lineHeight: [1.55],
      a: {
        transition: '500ms',
        '&:hover': {
          color: 'primary',
        },
      },
    },
    p: {
      display: 'flex',
      alignItems: 'center',
      fontSize: [1, null, 2],
      lineHeight: [2],
      color: 'text',
      opacity: 0.8,
      mt: ['4px'],
      img: {
        width: ['16px', null, 'auto'],
        mr: ['8px'],
      },
    },
  },
};
