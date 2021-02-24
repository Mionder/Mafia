import React, {Component} from "react";
import $ from "jquery";

export default class Player extends Component{
    state = {
        banStatus: {
            first: false,
            second: false,
            third: false,
        }
    }

    banStatus =  () => {
        const {first,second,third} = this.state.banStatus;
        console.log(first,second,third);
        if(!first){
             this.setState({banStatus: {first: true, second: false, third: false}})
            return 0;
        }
        else if(first && !second){
            this.setState({banStatus: {first: true, second: true, third: false}})
            return 0;
        }
        else if(first && second && !third){
            this.setState({banStatus: {first: true, second: true,third: true}})
            return 0;
        }
    }

    render() {
        const {role, id} = this.props;
        const {banStatus} = this.state;
        return(
            <div className="item-role">
                <p className="game-index">{id}.</p>
                <p className="game-role">
                    {role}
                </p>
                <div className="buttons-row">
                    <button className="btn-game">
                        <svg onClick={()=>this.banStatus()} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                             className={banStatus.first ? "svg-inline--fa fa-ban fa-w-16 active-ban" : "svg-inline--fa fa-ban fa-w-16"} role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path>
                        </svg>
                    </button>
                    <button className="btn-game">
                        <svg onClick={()=>this.banStatus()} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                             className={banStatus.second ? "svg-inline--fa fa-ban fa-w-16 active-ban" : "svg-inline--fa fa-ban fa-w-16"} role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path>
                        </svg>
                    </button>
                    <button className="btn-game">
                        <svg onClick={()=>this.banStatus()} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban"
                             className={banStatus.third ? "svg-inline--fa fa-ban fa-w-16 active-ban" : "svg-inline--fa fa-ban fa-w-16"} role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }
}