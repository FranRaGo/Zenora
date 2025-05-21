import React, { useState, useEffect } from "react";

const ShowInvitations = ({ idUser, onJoined }) => {
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        const loadInvitations = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/invitations/user_id/${idUser}`);
                if (!res.ok) throw new Error(`Error ${res.status}`);
                const invitationsData = await res.json();

                const invitedOnly = invitationsData.filter(inv => inv.status === "invited");
                if (invitedOnly.length === 0) return;

                const invitationWithSpace = await Promise.all(
                    invitedOnly.map(async (inv) => {
                        const res = await fetch(`http://localhost:3000/api/space/id/${inv.space_id}`);
                        if (!res.ok) throw new Error(`Error fetching space ${inv.space_id}`);
                        const spaceData = await res.json();
                        return {
                            space: spaceData[0],
                            role: inv.role,
                            invitationId: inv.id,
                        };
                    })
                );

                setInvitations(invitationWithSpace);
            } catch (err) {
                console.error("Error function loadInvitations:", err);
            }
        };

        loadInvitations();
    }, [idUser]);

    const joinSpace = async (spaceId, role, invitationId) => {
        const newUser = {
            spaceId,
            userId: idUser,
            role,
        };


        try {
            const join = await fetch(`http://localhost:3000/api/addUserSpace`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!join.ok) throw new Error(`Error ${join.status}`);
            console.log("Usuario añadido al espacio correctamente");

            const del = await fetch(`http://localhost:3000/api/deleteInvitation/${invitationId}`, {
                method: "DELETE",
            });

            if (!del.ok) throw new Error("Error al eliminar la invitación");
            console.log("Invitación eliminada");

            // Actualiza la lista quitando la invitación
            setInvitations(prev => prev.filter(inv => inv.invitationId !== invitationId));
            if (onJoined) onJoined();
            
        } catch (err) {
            console.error("Error al procesar la invitación:", err);
        }
    };

    const deleteInvitation = async (invitationId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/deleteInvitation/${invitationId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Error al eliminar la invitación");
            console.log("Invitación cancelada");

            setInvitations(prev => prev.filter(inv => inv.invitationId !== invitationId));
        } catch (err) {
            console.error("Error al eliminar la invitación:", err);
        }
    };

    return (
        <div className="showInvitations">
            <p className="title-invitatios">Invitations</p>
            {invitations.length > 0 ? (
                invitations.map(({ space, role, invitationId }) => (
                    <div key={space.id} className="invitation-card">
                        <p><span>title: </span>{space.name}</p>
                        <div className="div-options-invitation">
                            <button className="btn-aceptar-invitation" onClick={() => joinSpace(space.id, role, invitationId)}>Aceptar</button>
                            <button className="btn-cancel-invitation" onClick={() => deleteInvitation(invitationId)}>Cancelar</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="mesaje-notifi-invite">You don't have invitations pending.</p>
            )}
        </div>
    );
};

export default ShowInvitations;
