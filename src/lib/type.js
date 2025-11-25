import PropTypes from "prop-types";

export const NotePropType = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.number,
});
