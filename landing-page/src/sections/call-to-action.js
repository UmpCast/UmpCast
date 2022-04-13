import React from 'react';
import { Box, Container, Heading, Button } from 'theme-ui';
import BgShape from 'assets/cta-shape-1.svg';
import btnShape from 'assets/cta-btn-shape-1.svg';
const CallToAction = () => {
  return (
    <Box sx={styles.wrapper}>
      <Container sx={styles.container}>
        <Box sx={styles.inner}>
          <Heading as="h3">
            Hire the world’s best developers <br />
            and designers around!
          </Heading>
          <Box sx={styles.btnWrapper}>
            <Button sx={styles.btn}>HIRE DEVELOPERS</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction;

const styles = {
  wrapper: {},
  inner: {
    padding: ['45px 30px 50px', null, null, '45px 50px', null, '45px 70px'],
    mt: [0, null, null, null, '-80px'],
    position: 'relative',
    zIndex: '10',
    backgroundColor: 'primary',
    backgroundImage: ['none', null, null, null, null, `url(${BgShape})`],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '60% center',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    textAlign: ['center', null, null, 'left'],
    flexDirection: ['column', null, null, 'row'],
    justifyContent: ['center', null, null, 'space-between'],
    h3: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: [5, null, 4, null, null, 6, 7],
      lineHeight: [1.24, null, 1.53],
      padding: ['0 15px', '0'],
      marginBottom: ['50px', null, null, '0'],
      br: {
        display: ['none', null, null, 'inherit'],
      },
    },
  },
  btn: {
    backgroundColor: '#fff',
    color: 'primary',
    borderRadius: '5px',
    fontSize: [0, 1, null, null, null, null, '17px'],
    fontWeight: '700',
    letterSpacing: '0.1em',
    fontFamily: 'body',
    padding: ['10px 24px', null, null, null, null, '15px 44px'],
    position: 'relative',
    outline: 'none',
    webkitAppearance: 'none',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      width: '73px',
      height: '26px',
      backgroundImage: `url(${btnShape})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      bottom: 'calc(100% + 10px)',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&:after': {
      bottom: 'auto',
      top: 'calc(100% + 10px)',
      transform: 'translateX(-50%) rotate(180deg)',
    },
    '&:hover': {
      backgroundColor: 'black',
      color: '#fff',
    },
  },
};
