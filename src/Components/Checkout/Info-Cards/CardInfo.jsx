import React from 'react'
import PropTypes from 'prop-types'

function CardInfo({card, onChange}) {
    return (
        <div className="dark-grey-bg p-4 mb-5">
            <div className="row justify-content-between">
                <div className="col-md-9 mb-3 order-2 order-md-1">
                    <h3 className="heading-lvl-three mb-4">Pay With</h3>
                    <ul className="grey-text">
                        <li>{card?.cardBrand} Card</li>
                        <li>{card?.cardHolder}</li>
                        <li>{card?.last4}</li>
                        <li>{card?.expiry}</li>
                    </ul>
                </div>
                <div className="col-md-3 mb-3 text-end order-1 order-md-2">
                    <a onClick={() => onChange()} className="green-link font-weight-lighter">Change</a>
                </div>
            </div>
        </div>
    )
}

CardInfo.propTypes = {}

export default CardInfo
