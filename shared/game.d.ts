import { z } from "zod";
export declare const nuguPrompt: z.ZodObject<{
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    slug: string;
}, {
    slug: string;
}>;
export declare type NuguPrompt = z.infer<typeof nuguPrompt>;
export declare const playerS: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    imageUrl?: string | undefined;
    id: string;
    username: string;
}, {
    imageUrl?: string | undefined;
    id: string;
    username: string;
}>;
export declare type ClientPlayer = z.infer<typeof playerS>;
export declare const clientSeat: z.ZodObject<{
    answer: z.ZodOptional<z.ZodNumber>;
    answered: z.ZodBoolean;
    points: z.ZodNumber;
    player: z.ZodObject<{
        id: z.ZodString;
        username: z.ZodString;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        imageUrl?: string | undefined;
        id: string;
        username: string;
    }, {
        imageUrl?: string | undefined;
        id: string;
        username: string;
    }>;
}, "strip", z.ZodTypeAny, {
    answer?: number | undefined;
    answered: boolean;
    points: number;
    player: {
        imageUrl?: string | undefined;
        id: string;
        username: string;
    };
}, {
    answer?: number | undefined;
    answered: boolean;
    points: number;
    player: {
        imageUrl?: string | undefined;
        id: string;
        username: string;
    };
}>;
export declare type ClientSeat = z.infer<typeof clientSeat>;
export declare const clientRoom: z.ZodObject<{
    id: z.ZodString;
    owner: z.ZodString;
    personPool: z.ZodArray<z.ZodNumber>;
    seats: z.ZodRecord<z.ZodObject<{
        answer: z.ZodOptional<z.ZodNumber>;
        answered: z.ZodBoolean;
        points: z.ZodNumber;
        player: z.ZodObject<{
            id: z.ZodString;
            username: z.ZodString;
            imageUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            imageUrl?: string | undefined;
            id: string;
            username: string;
        }, {
            imageUrl?: string | undefined;
            id: string;
            username: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        answer?: number | undefined;
        answered: boolean;
        points: number;
        player: {
            imageUrl?: string | undefined;
            id: string;
            username: string;
        };
    }, {
        answer?: number | undefined;
        answered: boolean;
        points: number;
        player: {
            imageUrl?: string | undefined;
            id: string;
            username: string;
        };
    }>>;
    secondsPerRound: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    owner: string;
    personPool: number[];
    seats: Record<string, {
        answer?: number | undefined;
        answered: boolean;
        points: number;
        player: {
            imageUrl?: string | undefined;
            id: string;
            username: string;
        };
    }>;
    secondsPerRound: number;
}, {
    id: string;
    owner: string;
    personPool: number[];
    seats: Record<string, {
        answer?: number | undefined;
        answered: boolean;
        points: number;
        player: {
            imageUrl?: string | undefined;
            id: string;
            username: string;
        };
    }>;
    secondsPerRound: number;
}>;
export declare type ClientRoom = z.infer<typeof clientRoom>;
export declare const Messages: {
    p: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    create_room: z.ZodObject<{
        game: z.ZodString;
        personIds: z.ZodArray<z.ZodNumber>;
        timeLimit: z.ZodNumber;
        hints: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        game: string;
        personIds: number[];
        timeLimit: number;
        hints: boolean;
    }, {
        hints?: boolean | undefined;
        game: string;
        personIds: number[];
        timeLimit: number;
    }>;
    join_room: z.ZodObject<{
        game: z.ZodString;
        room: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        game: string;
        room: string;
    }, {
        game: string;
        room: string;
    }>;
    pickPerson: z.ZodObject<{
        persons: z.ZodArray<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        persons: number[];
    }, {
        persons: number[];
    }>;
    leave_room: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    answer: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
    start_game: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    auth: z.ZodObject<{
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
    }, {
        token: string;
    }>;
};
declare type PublicEventsKeys = "auth";
export declare type IncomingMessageData = typeof Messages;
export declare type IncomingMessageArgs<T extends keyof IncomingMessageData> = z.infer<IncomingMessageData[T]>;
declare type PublicEvents = Pick<IncomingMessageData, PublicEventsKeys>;
declare type PrivateEvents = Omit<IncomingMessageData, PublicEventsKeys | "p">;
export declare type IncomingMessageType = keyof IncomingMessageData;
export declare type PublicIncomingMessageType = keyof PublicEvents;
export declare type PrivateIncomingMessageType = keyof PrivateEvents;
export declare type IncomingMessage = {
    t: IncomingMessageType;
} & z.infer<IncomingMessageData[IncomingMessageType]>;
export declare type KnownIncomingMessage<T extends IncomingMessageType> = {
    t: T;
} & z.infer<IncomingMessageData[T]>;
export declare type KnownOutgoingMessage<T extends keyof typeof outgoingMessageData> = {
    t: T;
    state?: ClientRoom;
} & z.infer<typeof outgoingMessageData[T]>;
export declare const revealedAnswer: z.ZodObject<{
    person: z.ZodNumber;
    users: z.ZodArray<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    person: number;
    users: number[];
}, {
    person: number;
    users: number[];
}>;
export declare type RevealedAnswer = z.infer<typeof revealedAnswer>;
export declare const personChoice: z.ZodObject<{
    personId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    personId: number;
}, {
    personId: number;
}>;
export declare type PersonChoice = z.infer<typeof personChoice>;
export declare const outgoingMessageData: {
    readonly p: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    readonly error: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
    readonly technical_error: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
    readonly created_room: z.ZodObject<{
        room: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            personPool: z.ZodArray<z.ZodNumber>;
            seats: z.ZodRecord<z.ZodObject<{
                answer: z.ZodOptional<z.ZodNumber>;
                answered: z.ZodBoolean;
                points: z.ZodNumber;
                player: z.ZodObject<{
                    id: z.ZodString;
                    username: z.ZodString;
                    imageUrl: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                }, {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>>;
            secondsPerRound: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        }, {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        room: {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        };
    }, {
        room: {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        };
    }>;
    readonly joined_room: z.ZodUnion<[z.ZodObject<{
        room: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            personPool: z.ZodArray<z.ZodNumber>;
            seats: z.ZodRecord<z.ZodObject<{
                answer: z.ZodOptional<z.ZodNumber>;
                answered: z.ZodBoolean;
                points: z.ZodNumber;
                player: z.ZodObject<{
                    id: z.ZodString;
                    username: z.ZodString;
                    imageUrl: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                }, {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>>;
            secondsPerRound: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        }, {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        room: {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        };
    }, {
        room: {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        };
    }>, z.ZodObject<{
        error: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        error: string;
    }, {
        error: string;
    }>]>;
    readonly roomUpdate: z.ZodObject<{
        room: z.ZodObject<{
            id: z.ZodString;
            owner: z.ZodString;
            personPool: z.ZodArray<z.ZodNumber>;
            seats: z.ZodRecord<z.ZodObject<{
                answer: z.ZodOptional<z.ZodNumber>;
                answered: z.ZodBoolean;
                points: z.ZodNumber;
                player: z.ZodObject<{
                    id: z.ZodString;
                    username: z.ZodString;
                    imageUrl: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                }, {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>>;
            secondsPerRound: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        }, {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        room: {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        };
    }, {
        room: {
            id: string;
            owner: string;
            personPool: number[];
            seats: Record<string, {
                answer?: number | undefined;
                answered: boolean;
                points: number;
                player: {
                    imageUrl?: string | undefined;
                    id: string;
                    username: string;
                };
            }>;
            secondsPerRound: number;
        };
    }>;
    readonly connect: z.ZodObject<{
        seat: z.ZodObject<{
            answer: z.ZodOptional<z.ZodNumber>;
            answered: z.ZodBoolean;
            points: z.ZodNumber;
            player: z.ZodObject<{
                id: z.ZodString;
                username: z.ZodString;
                imageUrl: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            }, {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        }, {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        seat: {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        };
    }, {
        seat: {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        };
    }>;
    readonly disconnect: z.ZodObject<{
        seat: z.ZodObject<{
            answer: z.ZodOptional<z.ZodNumber>;
            answered: z.ZodBoolean;
            points: z.ZodNumber;
            player: z.ZodObject<{
                id: z.ZodString;
                username: z.ZodString;
                imageUrl: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            }, {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        }, {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        seat: {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        };
    }, {
        seat: {
            answer?: number | undefined;
            answered: boolean;
            points: number;
            player: {
                imageUrl?: string | undefined;
                id: string;
                username: string;
            };
        };
    }>;
    readonly force_disconnected: z.ZodObject<{
        reason: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reason: string;
    }, {
        reason: string;
    }>;
    readonly starting: z.ZodObject<{
        secs: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        secs: number;
    }, {
        secs: number;
    }>;
    readonly round_start: z.ZodObject<{
        person: z.ZodObject<{
            slug: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            slug: string;
        }, {
            slug: string;
        }>;
        secs: z.ZodNumber;
        scores: z.ZodRecord<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        secs: number;
        person: {
            slug: string;
        };
        scores: Record<string, number>;
    }, {
        secs: number;
        person: {
            slug: string;
        };
        scores: Record<string, number>;
    }>;
    readonly game_end: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    readonly user_answer: z.ZodUnion<[z.ZodObject<{
        userId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId: string;
    }, {
        userId: string;
    }>, z.ZodObject<{
        userId: z.ZodString;
        choice: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        choice: number;
    }, {
        userId: string;
        choice: number;
    }>]>;
    readonly answers_reveal: z.ZodObject<{
        correctAnswer: z.ZodNumber;
        answers: z.ZodArray<z.ZodObject<{
            person: z.ZodNumber;
            users: z.ZodArray<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            person: number;
            users: number[];
        }, {
            person: number;
            users: number[];
        }>>;
    }, "strip", z.ZodTypeAny, {
        correctAnswer: number;
        answers: {
            person: number;
            users: number[];
        }[];
    }, {
        correctAnswer: number;
        answers: {
            person: number;
            users: number[];
        }[];
    }>;
    readonly round_end: z.ZodObject<{
        correctAnswer: z.ZodNumber;
        answers: z.ZodArray<z.ZodObject<{
            person: z.ZodNumber;
            users: z.ZodArray<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            person: number;
            users: number[];
        }, {
            person: number;
            users: number[];
        }>>;
    }, "strip", z.ZodTypeAny, {
        correctAnswer: number;
        answers: {
            person: number;
            users: number[];
        }[];
    }, {
        correctAnswer: number;
        answers: {
            person: number;
            users: number[];
        }[];
    }>;
    readonly personList: z.ZodObject<{
        people: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
            aliases: z.ZodArray<z.ZodString>;
            group: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            group?: number | undefined;
            id: number;
            name: string;
            aliases: string[];
        }, {
            group?: number | undefined;
            id: number;
            name: string;
            aliases: string[];
        }>>;
    }, "strip", z.ZodTypeAny, {
        people: {
            group?: number | undefined;
            id: number;
            name: string;
            aliases: string[];
        }[];
    }, {
        people: {
            group?: number | undefined;
            id: number;
            name: string;
            aliases: string[];
        }[];
    }>;
    readonly auth: z.ZodObject<{
        success: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        success: boolean;
    }, {
        success: boolean;
    }>;
};
export declare const stateExempt: (keyof typeof outgoingMessageData)[];
export declare type OutgoingMessageType = keyof typeof outgoingMessageData;
export declare type OutgoingMessage = {
    t: OutgoingMessageType;
    state?: ClientRoom;
} & z.infer<typeof outgoingMessageData[OutgoingMessageType]>;
export declare class ClientError {
    message: string;
    constructor(message: string);
}
export declare class ClientTechnicalError {
    message: string;
    constructor(message: string);
}
export {};
