import React, { useState } from 'react';
import '../app/App.css';
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { TABLE_FIELDS } from '../enum';
import { getUsers } from '../services/service';
import TableRow from '../components/TableRow';

function Home() {
    const { register, handleSubmit, required, formState: { errors } } = useForm();
    const [uname, setUname] = useState(null)

    const { data, status, error } = useQuery(['users', uname], getUsers,
        {
            // Refetch the data every second
            refetchInterval: 0,
        }
    );

    const formSubmit = (data) => {
        const { username } = data;
        setUname(username);
    }

    // useEffect(() => getUsers(), [])

    return (
        <div className="container">
            <header >
                <h1>User list</h1>
            </header>
            <form onSubmit={handleSubmit(formSubmit)}>
                <input placeholder={"Search user"} type={"text"} className="Text-input"  {...register("username", { required: "Username is required" })} />
                <input type="submit" className='btn btn-primary' />
            </form>
            {errors.username && <p className="alert alert-danger marginTop10">{errors.username?.message}</p>}

            {status === "error" && <p>Error fetching data {error.message}</p>}
            {status === "loading" && <p>Fetching data...</p>}

            <table className="table marginTop10" >
                <thead className="thead-dark">
                    <tr>
                        {TABLE_FIELDS.map(item => <th>
                            {item}
                        </th>
                        )
                        }

                    </tr>
                </thead>
                {status === "success" && renderTable(data)}
            </table>
        </div>
    );
}

function renderTable(users = null) {
    if (Array.isArray(users)) {
        return users.map(item =>   <TableRow {...item}/>)
    } else if (typeof users === 'object' && users !== null) {
        // return tableRow(users)
        return(<TableRow {...users}/>);
    }

}


export default Home;