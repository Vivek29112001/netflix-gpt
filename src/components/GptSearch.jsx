import GptSearchBar from  "./gpt/GptSearchBar.jsx"
import GptMovieSuggestion from './gpt/GptMovieSuggestion'
import { BG_URL } from "../utils/constants.jsx"

const GptSearch =()=>{
    return(
        <div className="gpt-search">
            <div className="absolute inset-0 -z-10">
                <img
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt="background"
                />
            </div>
            <GptSearchBar/>
            <GptMovieSuggestion/>
        </div>
    )
}
export default GptSearch