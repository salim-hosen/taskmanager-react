import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

function BuyerSidebar(props) {

    const navigate = useNavigate();
    const {user} = props;

    return (
        <aside className="md:h-screen w-full sm:w-1/3 md:w-1/5  bg-gray-800">
            <div className="w-full">
              <ul className="flex flex-col overflow-hidden">
                <div className="px-8">
                  <div className="h-16 w-full flex items-center">
                    <h3 className="text-xl font-bold text-gray-200">
                      Buyer Dashboard
                    </h3>
                  </div>
                  <ul className="py-5">

                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="/dashboard"
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-create-dashboard"></i>
                          <span className="text-sm ml-2">Dashboard</span>
                        </div>
                      </Link>
                    </li>

                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="/projects"
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-constructor"></i>
                          <span className="text-sm ml-2">Projects</span>
                        </div>
                      </Link>
                    </li>

                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="/tasks"
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-clipboard"></i>
                          <span className="text-sm ml-2">Tasks</span>
                        </div>
                      </Link>
                    </li>

                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="/worksheets"
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-file-graph"></i>
                          <span className="text-sm ml-2">Worksheets</span>
                        </div>
                      </Link>
                    </li>

                    {
                      user.role == "admin" && 
                      <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="/users"
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-users-alt"></i>
                          <span className="text-sm ml-2">Users</span>
                        </div>
                      </Link>
                    </li>
                    }

                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="/settings"
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                          <i className="uil uil-cog"></i>
                          <span className="text-sm ml-2">Settings</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex w-full justify-between text-gray-300 hover:text-gray-200 cursor-pointer items-center">
                      <Link
                        to="#"
                        onClick={() => props.logoutUser(navigate)}
                        className="block w-full py-2 font-medium"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-signout"></i>
                          <span className="text-sm ml-2">Sign Out</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </aside>
    )
}



const mapStateToProps = (state) => ({
    user: state.user,
});
  
const mapActionsToProps = {
    logoutUser,
}
  
  
  export default connect(mapStateToProps, mapActionsToProps)(BuyerSidebar)
  