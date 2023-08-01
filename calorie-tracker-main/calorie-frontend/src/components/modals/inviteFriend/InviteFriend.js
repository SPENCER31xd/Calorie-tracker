import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeInviteModal } from "../../../redux/features/modals/inviteFriendSlice";

const InviteFriend = () => {
  const { isOpen } = useSelector((state) => state.inviteModal);
  const dispatch = useDispatch();
  return (
    isOpen && (
      <div className="absolute top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center">
        <div className="bg-white shadow w-1/3 rounded-lg p-5">
          <div className="flex flex-col gap-3 mb-8">
            <div>
              <div>Name</div>
              <input className="border-2 p-2 rounded-md outline-none w-full" />
            </div>
            <div>
              <div>Email Address</div>
              <input className="border-2 p-2 rounded-md outline-none w-full" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-black text-white rounded-lg p-2">
              Invite friend
            </button>
            <button
              onClick={() => dispatch(closeInviteModal())}
              className="bg-gray-200 rounded-lg p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default InviteFriend;
