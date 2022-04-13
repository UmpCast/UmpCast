import React, { useState } from 'react';
import { Container, Box, Heading, Text } from 'theme-ui';
import Image from 'components/image';
import { Link } from 'components/link';
import { FaAngleRight, FaPlay } from 'react-icons/fa';
import ModalVideo from 'react-modal-video';

import videoImg from 'assets/video.png';

const VideoOne = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };
  return (
    <Box as="section" sx={styles.video}>
      <Container>
        <Heading as="h3">
          Leading companies trust us <br /> to develop software
        </Heading>
        <Text as="p">
          We believe it’s important for everyone to have access to software{' '}
          <br />
          especially when it comes to digital learning be navigate.
        </Text>
        <Link path="/" sx={styles.link}>
          Explore Details <FaAngleRight />
        </Link>
        <Box sx={styles.videoBox}>
          <Image src={videoImg} alt="" />
          <Link
            path="/"
            aria-label="video btn"
            onClick={handleClick}
            sx={styles.videoBtn}
          >
            <FaPlay />
          </Link>
        </Box>
      </Container>
      <ModalVideo
        channel="youtube"
        isOpen={videoOpen}
        videoId="Cm3U-NgJb9I"
        onClose={() => setVideoOpen(false)}
      />
    </Box>
  );
};

export default VideoOne;

const styles = {
  video: {
    pt: [80, null, null, null, null, null, 110],
    textAlign: 'center',
    h3: {
      margin: 0,
      color: 'black',
      fontSize: [5, null, null, '21px', '36px', '32px', 8],
      letterSpacing: ['-0.5px', null, null, null, null, '-1.5px'],
      fontWeight: 'bold',
      lineHeight: [1.6, null, null, 1.25],
    },
    p: {
      fontSize: ['15px', null, null, '17px'],
      lineHeight: ['26px', null, null, 2],
      mt: ['10px', null, null, null, '25px'],
      mb: ['0px', null, null, null, '20px'],
    },
    br: {
      display: ['none', null, null, 'inherit'],
    },
  },
  videoBox: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '>img': {
      borderRadius: '10px',
      display: 'flex',
      width: ['100%', null, null, null, '80%', null, '100%'],
    },
  },
  link: {
    color: 'primary',
    fontSize: [1, null, 2],
    display: 'inline-block',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    mt: ['15px', null, null, null, '0px'],
    mb: ['20px', null, null, '50px'],
    svg: {
      position: 'relative',
      top: '3px',
    },
  },
  videoBtn: {
    width: [44, null, 44, 66, 120],
    height: [44, null, 44, 66, 120],
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    transition: '500ms ease',
    svg: {
      fontSize: ['15px', null, '15px', null, '22px', '35px'],
      color: ['primary'],
    },
    '&:hover': {
      backgroundColor: 'primary',
      svg: {
        color: '#fff',
      },
    },
  },
};
