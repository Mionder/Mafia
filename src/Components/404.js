import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="error-page">
            <div className="error-wrapper">
                <div className="cards-error">
                    <div className="item-err"><span>4</span></div>
                    <div className="card-err">
                        <div className="item-err item-center-err"><span>0</span></div>
                        <div className="item-err item-err-back">
                            <img
                                src="https://yt3.ggpht.com/ytc/AAUvwngbfE1vQvZwwvsUhlCsqXrgibSd4z_W6y-DEcHQuw=s900-c-k-c0x00ffffff-no-rj"
                                alt="logo"/>
                        </div>
                    </div>
                    <div className="item-err"><span>4</span></div>
                </div>
                <p className="error-label">Упс, что-то пошло не так</p>
                <Link to="/" className="btn mt-20">На главную</Link>
            </div>
        </div>
    )
}