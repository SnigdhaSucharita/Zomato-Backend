import React from 'react';
import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component{
    render(){
        const { mealtypeData } = this.props;
        return(
            <div>
                <div className="container">
                    <h2 className="heading">Quick Searches</h2>
                    <p className="heading-text">Discover restaurants by type of meal</p>

                    {/* QuickSearchItem */}

                    <div className="d-flex flex-wrap">
                        {
                          mealtypeData.map((items) => {
                            return(
                            <QuickSearchItem data = { items } />
                            )
                          })  
                        }  
                    </div>
                </div>
            </div>
        )
    }
}

export default QuickSearch;