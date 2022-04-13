import React from 'react';
import { Box, Container, Grid, Heading, Text } from 'theme-ui';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'components/link';
import Image from 'components/image';

import img1 from 'assets/cta-2-1.png';

const CustomerSupport = () => {
  return (
    <Box as="section" sx={styles.customerSupport}>
      <Container>
        <Grid sx={styles.row}>
          <Box sx={styles.col}>
            <Box sx={styles.content}>
              <Heading as="h3">
                Free Customer Support to ensure what you like to expect
              </Heading>
              <Text as="p">
                We offer a risk-free trial period of up to two weeks. You will
                only have to pay if you are happy with the developer and wish to
                continue. If you are unsatisfied, we’ll refund payment or fix
                issues on our dime period customers.
              </Text>
              <Text as="p" sx={styles.specialText}>
                If you are happy with the developer and wish to continue. If you
                are unsatisfied, we’ll refund payment or fix issues.
              </Text>
              <Link path="/" sx={styles.link}>
                Learn more <FaAngleRight />
              </Link>
            </Box>
          </Box>
          <Box sx={styles.col}>
            <Image src={img1} alt="" />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerSupport;

const styles = {
  customerSupport: {
    overflow: 'hidden',
    pt: ['75px', null, null, null, '0', '80px'],
    pb: ['75px', null, null, null, null, '120px', '210px'],
  },
  row: {
    display: 'grid',
    gridGap: [0, null, null, null, '25px', null, '55px'],
    gridTemplateColumns: ['1fr', null, null, null, '1fr 1fr'],
  },
  col: {
    img: {
      maxWidth: ['100%', null, null, '60%', '100%', 'none'],
      mx: [null, null, null, 'auto', '0'],
      display: [null, null, null, 'block'],
      mt: [null, null, null, null, '40px', '0'],
    },
  },
  content: {
    pt: [0, null, null, null, '160px', '210px'],
    mb: [null, null, null, '-40px', '0'],
    position: 'relative',
    zIndex: 10,
    paddingLeft: ['12px', null, null, null, '0'],
    paddingRight: ['12px', null, null, null, '0', '75px', '0'],
    pb: ['10px'],
    maxWidth: [null, null, null, '590px', null, '100%'],
    width: ['100%'],
    mx: [null, null, null, 'auto', null, '0'],
    textAlign: ['center', null, null, null, 'left'],
    h3: {
      fontSize: [5, null, '21px', null, 7, '32px', 8],
      maxWidth: [null, null, null, '400px', 'none'],
      mx: [null, null, null, 'auto', '0'],
      color: 'black',
      fontWeight: 'bold',
      letterSpacing: ['-0.5px', null, null, null, null, null, '-1.5px'],
      lineHeight: [1.5, null, 1.25],
      mb: ['30px', null, null, null, '30px'],
    },
    p: {
      fontSize: [0, null, 2, null, '17px'],
      color: 'text',
      lineHeight: ['26px', null, null, 1.8, null, 2.06],
      '+p': {
        mt: ['15px', null, null, null, '15px'],
      },
    },
  },
  specialText: {
    color: 'heading',
    opacity: 0.6,
  },
  link: {
    color: 'primary',
    fontSize: [1, null, 2],
    display: 'inline-block',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    mt: ['10px', null, null, null, '10px'],
    svg: {
      position: 'relative',
      top: '3px',
    },
  },
};
