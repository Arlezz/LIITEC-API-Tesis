#ifndef subject_h
#define subject_h

#include <vector>
#include <unordered_map>
#include <observer/observer.h>
#include <device.h>

class Subject
{
    public:
        virtual void attach(Device *observer) = 0;
        virtual void detach(Device *observer) = 0;
        virtual void notify(char *topic, byte *payload, unsigned int length) = 0;
};

#endif // subject_h