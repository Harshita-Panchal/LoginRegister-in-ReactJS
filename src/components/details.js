import { useEffect, useState } from "react";
import ViewImage from "./viewImage";
import { useNavigate } from 'react-router-dom';
import './details.css';

function Details(props) {
    // used useNavigate for goto the next page
    let navigate = useNavigate();

    const [breeds, setBreeds] = useState([])
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {

        // get API for dogs breed list
        const getBreeds = async () => {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            const result = await response.json()
            setBreeds(result && result.message && Object.keys(result.message));
        }
        getBreeds();
    }, [])

    const view = (id) => {
        // this API used for displaying dog images
        fetch(`https://dog.ceo/api/breed/${breeds[id]}/images/random`)
            .then((response) => response.json())
            .then((data) => {
                setImageUrl(data.message);

            })
    }

    // this function for logout and navigate to login page
    const logout = () => {
        localStorage.setItem("isLoggedIn", false)
        props.stateChange(false)
        navigate('/')
    }

    return (
        <div>
            <nav>
                <h2> <img src="	https://dog.ceo/img/dog-api-logo.svg" alt="Dog-img" /> Dog Breeds</h2>
                <button className="logout-btn" onClick={logout}>logout</button>
            </nav>
            <div className="heading">
                <h3>DOGS BREEDS LIST</h3>
            </div>
            <div className="data">
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Breeds List</th>
                                <th>Views</th>
                            </tr>
                        </thead>
                        <tbody className="scroll-bar">
                            {breeds.map((createEle, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{createEle}</td>
                                        <td><button onClick={() => view(index)} className="view-btn">View</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <ViewImage imageUrl={imageUrl} />
                </div>
            </div>
        </div>
    )

}

export default Details;