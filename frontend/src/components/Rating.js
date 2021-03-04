import React from 'react';
import PropTypes from 'prop-types'


const Rating = ({ value, text, color }) => {
    let stars = [];
    let halfStar = 0.5;

    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={`star${i + 1}`}>
                <i style={{ color }}
                    className={
                        value >= i + 1
                            ? 'fas fa-star'
                            : value >= halfStar
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'}
                />
            </span>)
        halfStar++;

    }


    return (
        <div className='rating'>
            {stars}
            <span>{text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating
