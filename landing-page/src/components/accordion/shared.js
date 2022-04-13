/** @jsx jsx */
import { jsx } from 'theme-ui';
import { motion } from 'framer-motion';

export const AccordionButton = ({ children, ...rest }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      color: '#0F2137',
      cursor: 'pointer',
      border: 'none',
      ':focus': {
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
      },
    }}
    {...rest}
  >
    {children}
  </div>
);

const variants = {
  open: {
    // maxHeight: 200,
    height: 'auto',
    marginTop: 25,
  },
  closed: { height: 0, marginTop: 0 },
};
export function AccordionContents({ isOpen, ...props }) {
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      css={{
        overflowY: 'hidden',
        textAlign: 'justify',
        fontSize: 15,
        lineHeight: '32px',
        color: '#343D48',
      }}
      {...props}
    />
  );
}

export const AccordionItem = ({ isOpen, children, ...rest }) => (
  <div
    css={{
      boxShadow: isOpen ? '0px 9px 30px rgba(69, 88, 157, 0.08)' : 'unset',
      backgroundColor: isOpen ? '#FFF' : '#F6F8FB',
      borderRadius: 10,
      marginBottom: 20,
      padding: 25,
      overflow: 'hidden',
    }}
    {...rest}
  >
    {children}
  </div>
);

export const preventClose = (state, changes) =>
  changes.type === 'closing' && state.openIndexes.length < 2
    ? { ...changes, openIndexes: state.openIndexes }
    : changes;

export const single = (state, changes) =>
  changes.type === 'opening'
    ? { ...changes, openIndexes: changes.openIndexes.slice(-1) }
    : changes;

export const combineReducers = (...reducers) => (state, changes) =>
  reducers.reduce((acc, reducer) => reducer(state, acc), changes);
