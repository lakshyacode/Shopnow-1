import React from 'react'
// import 'ItemList'
export default function ItemList(props) {
    return (
        <div className='card'>
            <div className="card text-center">
                <img src={!props.imgurl ? "https://cdn3.iconfinder.com/data/icons/ballicons-reloaded-free/512/icon-70-512.png" : props.imgurl} className="card-img-top mx-auto" alt="..." />
                <div className="card-body ">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-subtitle mb-2 text-muted">{props.price}</p>
                </div>
                <div className="card-footer ">
                    <a href={props.itemurl} target='_blank' rel='noreferrer' className="btn btn-info">{props.platform}</a>
                </div>
            </div>
        </div>
    )
}
