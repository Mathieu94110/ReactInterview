import { useEffect, useState, useRef, useCallback } from 'react'
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from "react-icons/fa"
import { IconType } from 'react-icons'
import { likesRatioType } from 'types'
import { formatNumber } from 'utils'
import './LikesRatioBar.scss'

const LikesRatioBar = ({ likes, dislikes }: likesRatioType) => {
    const [likesQty, setLikesQty] = useState<number>(0);
    const [dislikesQty, setDislikesQty] = useState<number>(0)
    const [userThumbFeedback, setUserThumbFeedback] = useState<string>('')
    const likesRef = useRef();
    const dislikesRef = useRef();

    const calculateBar = useCallback(
        () => {
            const total = likesQty + dislikesQty;
            const percentageLikes = (likesQty / total) * 100;
            const percentageDislikes = (dislikesQty / total) * 100;

            //We need to apply the widths ratio bar
            likesRef.current.style.width = percentageLikes.toString() + "%";
            dislikesRef.current.style.width = percentageDislikes.toString() + "%";
        },
        [likesQty, dislikesQty],
    );

    useEffect(() => {
        setLikesQty(likes);
        setDislikesQty(dislikes);
    }, [likes, dislikes])

    useEffect(() => {
        calculateBar();
    }, [likesQty, dislikesQty, calculateBar]);

    function addThumbUp(choice?: 'like' | 'dislike') {
        setUserThumbFeedback('like');
        setLikesQty(likesQty + 1);
        if (!choice) setDislikesQty(dislikesQty - 1)
    }

    function addThumbDown(choice?: 'like' | 'dislike') {
        setUserThumbFeedback('dislike');
        setDislikesQty(dislikesQty + 1)
        if (!choice) setLikesQty(likesQty - 1);
    }

    function toggleLikeDislike(choice: 'like' | 'dislike') {
        if (userThumbFeedback) {
            if (choice !== userThumbFeedback) {
                choice === 'like' ? addThumbUp() : addThumbDown()
            } else {
                if (choice === "like") {
                    setUserThumbFeedback('');
                    setLikesQty(likesQty - 1);
                } else if (choice === 'dislike') {
                    setUserThumbFeedback('');
                    setDislikesQty(dislikesQty - 1);
                }
            }
        } else {
            choice === 'like' ? addThumbUp(choice) : addThumbDown(choice)
        }
    }

    const renderIcon = (icon: IconType) => {
        const Icon = icon;
        const newUserThumbFeedback = icon === FaRegThumbsUp || icon === FaThumbsUp ? 'like' : 'dislike';
        return (
            <div onClick={() => toggleLikeDislike(newUserThumbFeedback)} className='likes-ratio-bar__feedback__icon'>
                <Icon /> {icon === FaRegThumbsUp || icon === FaThumbsUp ? formatNumber(likesQty) : formatNumber(dislikesQty)}
            </div>
        );
    };

    return (
        <div className="likes-ratio-bar">
            <div className="likes-ratio-bar__bar">
                <div className="likes-ratio-bar__likes" ref={likesRef}></div>
                <div className="likes-ratio-bar__dislikes" ref={dislikesRef}></div>
            </div>
            <div className="likes-ratio-bar__feedback">
                {userThumbFeedback && userThumbFeedback === 'like' ? renderIcon(FaThumbsUp) : renderIcon(FaRegThumbsUp)}
                {userThumbFeedback && userThumbFeedback === 'dislike' ? renderIcon(FaThumbsDown) : renderIcon(FaRegThumbsDown)}
            </div>
        </div>
    )
}

export default LikesRatioBar
